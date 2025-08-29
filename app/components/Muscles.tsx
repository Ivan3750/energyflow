
type Muscle = {
    name: string;
    imgUrl: string;
    filter: string;
};

export default async function Muscles() {
    const res = await fetch(
        "https://energyflow.b.goit.study/api/filters?filter=Muscles&page=1&limit=12",

    );

    const data = await res.json();

    return (
        <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
                {data.results.map((muscle: Muscle) => (
                    <div
                        key={muscle.name}
                        className="relative w-[313px] h-[250px] rounded-2xl overflow-hidden"
                    >
                        <img
                            src={muscle.imgUrl}
                            alt={muscle.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/55" />

                        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
                            <h2 className="font-[DM_Sans] font-normal text-white text-[24px] capitalize">
                                {muscle.name}
                            </h2>
                            <p className="font-[DM_Sans] font-normal text-[#F6F6F666] text-[18px] mt-1">
                                {muscle.filter}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}
