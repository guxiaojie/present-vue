const KEY = {
	category: {
		statementExpendList: "@category_statement_expend@",
		statementIncomeList: "@category_statement_income@",
		expendList: "@category_expend_list@",
		incomeList: "@category_income_list@"
	},
	asset: {
		statementAssets: "@asset_statement@",
		list: "@asset_list@"
	},
	alreadyLogin: "@alreadyLogin@",
	login: 'weapp_login_session',
	bgImageKey: '@user_index_bg@',
	errorKey: '@request_error@',
	localStatementKey: '@local_statement_cache@'
}

// module.exports = {
//     key: KEY,

//     get: function (key) {
//         return null;
//     },
//     set: function (key, value) {
//     }
// }


export default {
	key: KEY,

    get: function (key) {
        return null;
    },
    set: function (key, value) {
    }
  } 