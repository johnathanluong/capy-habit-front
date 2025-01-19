import { Accessory } from '@/app/interfaces/model';
import { AccessoryItem } from './AccessoryItem';

interface AccessoryShowcaseProps {
	accessories: Accessory[];
}

export function AccessoryShowcase({ accessories }: AccessoryShowcaseProps) {
	return (
		<div className='container mx-auto py-8'>
			<h2 className='text-2xl font-bold mb-6 text-center'>Capybara Accessories</h2>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
				{accessories.map((accessory) => (
					<AccessoryItem key={accessory.name} {...accessory} />
				))}
			</div>
		</div>
	);
}
