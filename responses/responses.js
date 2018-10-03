const responses = {
	token: {
		creation: {
			success: {
				status: 11,
				msg: 'token creation successful'
			},
			failure: {
				status: 12,
				msg: 'token creation failed'
			}
		},
		auth: {
			success: {
				status: 13,
				msg: 'token authentication successful'
			},
			failure: {
				status: 14,
				msg: 'token authentication failed'
			}
		},
		fetchAll: {
			success: {
				status: 15,
				msg: 'fetching successful'
			},
			failure: {
				status: 16,
				msg: 'fetching failed'
			}
		}
	}
}

module.exports = responses;