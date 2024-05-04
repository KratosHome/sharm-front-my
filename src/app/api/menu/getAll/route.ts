import {NextRequest, NextResponse} from "next/server";
import {connectToDb} from "@/server/connectToDb";
import {Menu} from "@/server/menu/menuSchema";

export async function GET(request: NextRequest) {
    if (request.method !== 'GET') return NextResponse.json({error: 'Method not allowed'}, {status: 405});

    const url = request.nextUrl;
    const local = url.searchParams.get('lang') || 'default_lang';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);

    try {
        await connectToDb();
        const matchQuery = {local: local};
        const total = await Menu.countDocuments(matchQuery);
        const totalPages = Math.ceil(total / limit);

        const post: any = await Menu.find({local: local});

        return NextResponse.json(
            {
                data: post,
                total,
                currentPage: page,
                totalPages
            }, {status: 201});
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Something went wrong!"}, {status: 500});
    }
}