type InfoOffre = {
	title: string;
	children?: React.ReactNode;
};

export function OffreCard({ title }: InfoOffre) {
	return (
		<div className="w-full md:flex-1 bg-[#3C454D] rounded-[15px] p-6 flex flex-col">
			<h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
			<div className="w-full h-48 bg-gray-600 rounded-lg mb-4" />
		</div>
	);
}
