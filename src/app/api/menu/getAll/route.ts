import {NextRequest, NextResponse} from "next/server";
import {connectToDb} from "@/server/connectToDb";
import {Menu} from "@/server/menu/menuSchema";

export async function GET(request: NextRequest) {
    if (request.method !== 'GET') return NextResponse.json({error: 'Method not allowed'}, {status: 405});

    const url = request.nextUrl;
    const local = url.searchParams.get('local') || 'ua';

    try {
        await connectToDb();
        const post: any = await Menu.find({local: local});

        return NextResponse.json(post, {status: 201});
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Something went wrong!"}, {status: 500});
    }
}