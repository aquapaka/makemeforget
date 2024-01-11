import supabase from './supabase';

export type ForgetType = {
	forget_name: string;
};

export default {
	addNewForget: async function (forget: ForgetType) {
		const { data, error } = await supabase.from('forget').insert([forget]).select();

		if (error) {
			console.log(error);
		}

		console.log(data);
	},
	getTotalForgetToday: async function () {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const todayString = today.toLocaleString('sv');

		const { count, error } = await supabase
			.from('forget')
			.select('*', { count: 'exact', head: true })
			.gte('forget_at', todayString);

		if (error) {
			console.log(error);
		}
		console.log('Total :' + count);

		return count ? count : -1;
	},
	getTotalForget: async function () {
		const { count, error } = await supabase
			.from('forget')
			.select('*', { count: 'exact', head: true })

		if (error) {
			console.log(error);
		}
		console.log('Total :' + count);

		return count ? count : -1;
	},
};
