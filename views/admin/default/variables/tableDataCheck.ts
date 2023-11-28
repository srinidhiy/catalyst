type RowObj = {
	name: [string, boolean];
	quantity: number;
	date: string;
};

const tableDataCheck: RowObj[] = [
	{
		name: [ 'Liquid Nitrogen', false ],
		quantity: 4,
		date: '28 Nov 2023',
	},
	{
		name: [ 'HPLC Water', true ],
		quantity: 8,
		date: '30 Nov 2023',
	},
	{
		name: [ 'Methanol', true ],
		quantity: 10,
		date: '30 Nov 2023',
	},
	{
		name: [ 'Pipette Tip Boxes', false ],
		quantity: 16,
		date: '1 Dec 2023',
	},
	{
		name: [ 'Gloves', true ],
		quantity: 250,
		date: '15 Dec 2023',
	},
	{
		name: [ 'HEK293 Cells', false ],
		quantity: 2,
		date: '23 Dec 2023',
	},

];

export default tableDataCheck;
