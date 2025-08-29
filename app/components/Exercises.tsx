import Muscles from "./Muscles";

export default function Exercises() {
    return (
        <div className="w-full flex justify-center">
            <section className="bg-[#E8E8E8] rounded-[50px] px-[48px] py-[55px] ">

                <h2 className="text-[44px] font-[DM_Sans] font-semibold mb-4">Exercises</h2>


                <div className="flex gap-2 mb-8">
                    <button className="px-4 py-2 rounded-full bg-white text-gray-700 font-medium ">
                        Muscles
                    </button>
                    <button className="px-4 py-2 rounded-full bg-white text-gray-700 font-medium">
                        Body parts
                    </button>
                    <button className="px-4 py-2 rounded-full bg-white text-gray-700 font-medium">
                        Equipment
                    </button>
                </div>


                <div >
                    <Muscles />
                </div>
            </section>
        </div>

    );
}
