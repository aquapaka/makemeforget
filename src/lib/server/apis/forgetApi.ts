import supabase from './supabase';

const FORGET_TABLE_NAME = 'makemeforget';

export type ForgetType = {
	forget_name: string;
};

export default {
	addNewForget: async function (forget: ForgetType) {
		const { data, error } = await supabase.from(FORGET_TABLE_NAME).insert([forget]).select();

		if (error) {
			console.log(error);
		}

		console.log('addNewForget data response', data);
	},
	getTotalForgetToday: async function () {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const todayString = today.toLocaleString('sv');

		const { count, error } = await supabase
			.from(FORGET_TABLE_NAME)
			.select('*', { count: 'exact', head: true })
			.gte('forget_at', todayString);

		if (error) {
			console.log(error);
		}
		console.log('Total today :' + count);

		return count ? count + 1 : 1;
	},
	getTotalForget: async function () {
		const { count, error } = await supabase
			.from(FORGET_TABLE_NAME)
			.select('*', { count: 'exact', head: true });

		if (error) {
			console.log(error);
		}
		console.log('Total :' + count);

		return count ? count + 1 : 1;
	}
};
