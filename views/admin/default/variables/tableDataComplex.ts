type RowObj = {
	name: string;
	status: string;
	date: string;
	progress: number;
};

const tableDataComplex: RowObj[] = [
	{
		name: 'Escherichia Bacteria Cultures',
		progress: 89.4,
		status: 'Approved',
		date: '20 Nov 2023'
	},
	{
		name: 'Gibco DMEM',
		progress: 5.5,
		status: 'Denied',
		date: '25 Nov 2023'
	},
	{
		name: 'Adeno-Associated Virus',
		progress: 50.5,
		status: 'Cancelled',
		date: '24 Nov 2023'
	},
	{
		name: 'Human Cardiac Fibroblast Cells',
		progress: 76,
		status: 'Approved',
		date: '18 Nov 2023'
	}
];
export default tableDataComplex;
