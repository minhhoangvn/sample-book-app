module.exports = { 
	description: 'TODO: Add description',
	required: true,
	type: 'object',
	properties: {
		'/customers': {
			description: 'Root level properties are the routes in your express app (IT edition)',
			required: true,
			type: 'object',
			properties: {
				get: {
					description: 'One of HTTP mehtods (express): get, put, del or post',
					required: true,
					type: 'object',
					properties: {
						description: {
							description: 'Description of this endpoint',
							required: false,
							type: ['null', 'string'],
							example: 'list all customers'
						},
						produces: {
							description: 'data format produced',
							required: false,
							type: ['null', 'string'],
							example: 'application/json'
						},
						example: {
							description: 'string representing an example of the (pretty-printed) JSON this endpoint produces',
							required: false,
							type: ['null', 'string']
						}
					}
				},
				post: {
					description: 'One of HTTP mehtods (express): get, put, del or post',
					required: true,
					type: 'object',
					properties: {
						description: {
							description: 'Description of this endpoint',
							required: false,
							type: ['null', 'string'],
							example: 'creates a new customer'
						},
						produces: {
							description: 'data format produced',
							required: false,
							type: ['null', 'string'],
							example: 'application/json'
						},
						consumes: {
							description: 'type of accepted by endpoint ',
							required: false,
							type: ['null', 'string'],
							example: 'application/json'
						},
						example: {
							description: 'string representing an example of the (pretty-printed) JSON this endpoint produces',
							required: false,
							type: ['null', 'string']
						}
					}
				}
			}
		}
	}
};