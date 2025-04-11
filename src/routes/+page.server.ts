import forgetApi from '$lib/server/apis/forgetApi.js';

export async function load() {
	const total = await forgetApi.getTotalForget();
	const totalToday = await forgetApi.getTotalForgetToday();

	return {
		total,
		totalToday
	};
}

export const actions = {
	default: async function ({ request }) {
		const data = await request.formData();

		const forgetName = data.get('forget_name') as string;

		if (forgetName.trim().length > 0) {
			forgetApi.addNewForget({
				forget_name: forgetName
			});
		} else {
			console.log('[WARN] Forget name is empty');
		}
	}
};
