import FAQ from "@/components/client/FAQ/FAQ";
import Banner from "@/components/client/Main/Banner/Banner";
import data from "./../../../components/client/Main/Banner/data.json"
export default function Home() {
    return (
        <main>
            <Banner data={data}/>
            <FAQ/>
        </main>
    );
}
