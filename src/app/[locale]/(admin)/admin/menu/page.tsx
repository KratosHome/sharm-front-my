import MenuItem from "@/components/admin/MenuItem/MenuItem";
import WrapperTreeList from "@/components/admin/Wrapper/WrapperTreeList";
import {getData} from "@/actions/getData";
import CreateMenu from "@/components/admin/menu/CreateMenu/CreateMenu";

export default async function Home() {
    const allMenus = await getData(`menu/getAll`, {locale: 'en'});

    return (
        <>
            <CreateMenu />
            <WrapperTreeList data={allMenus || []} type="menu">
                <MenuItem parentId={allMenus ? allMenus[0]?.id : []} menu={null}/>
            </WrapperTreeList>
        </>
    );
}
