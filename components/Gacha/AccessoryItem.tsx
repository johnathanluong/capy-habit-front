import Image from 'next/image';

interface AccessoryItemProps {
	name: string;
	description: string;
	image_filename: string;
	rarity: string;
}

const rarityColors = {
	common: 'text-gray-500',
	rare: 'text-blue-500',
	epic: 'text-purple-500',
	legendary: 'text-yellow-500'
};

export function AccessoryItem({ name, description, image_filename, rarity }: AccessoryItemProps) {
	return (
		<div className='flex flex-col items-center p-4 bg-white rounded-lg shadow-md'>
			<Image
				src={`/images/capybaras/${image_filename}`}
				alt={name}
				width={200}
				height={200}
				className='rounded-md mb-2'
			/>
			<h3 className={`text-lg font-semibold ${rarityColors[rarity as keyof typeof rarityColors]}`}>{name}</h3>
			<p className='text-sm text-gray-600 text-center mt-1'>{description}</p>
		</div>
	);
}
