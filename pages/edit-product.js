import React from "react";
import {
	Card,
	List,
	Page,
	Thumbnail,
	TextField,
	Layout
} from "@shopify/polaris";
import gql from "graphql-tag";
import store from "store-js";






class EditProduct extends React.Component {
	state = {
		id: '',
		price: "",
		title: "",
		image: "",
		color: "",
		type: "",
		length: "",
		width: "",
		height: "",
		top_finish: "",
		ends_finish: "",
		finish: "",
		created: false,
	};
	async componentDidMount() {
		await this.getItem();

	}
	handleChange = (name, value) => {
		this.setState({ [name]: value });
	};
	handleCreate = async() => {
		// const {
		// 	color,
		// 	type,
		// 	length,
		// 	width,
		// 	height,
		// 	top_finish,
		// 	ends_finish,
		// 	finish
		// } = this.state;
		// const metafields = [{
		// 	namespace: "global",
		// 	key: "Granite Color",
		// 	valueType: "STRING",
		// 	value: color
		//   },
		//   {
		// 	namespace: "global",
		// 	key: "Product Type",
		// 	valueType: "STRING",
		// 	value: type
		//   },
		//   {
		// 	namespace: "global",
		// 	key: "Length",
		// 	valueType: "INTEGER",
		// 	value: length
		//   },
		//   {
		// 	namespace: "global",
		// 	key: "Width",
		// 	valueType: "INTEGER",
		// 	value: width
		//   },
		//   {
		// 	namespace: "global",
		// 	key: "Height",
		// 	valueType: "INTEGER",
		// 	value: height
		//   },
		//   {
		// 	namespace: "global",
		// 	key: "Top Finish",
		// 	valueType: "STRING",
		// 	value: top_finish
		//   },
		//   {
		// 	namespace: "global",
		// 	key: "Ends Finish",
		// 	valueType: "STRING",
		// 	value: ends_finish
		//   },
		//   {
		// 	namespace: "global",
		// 	key: "Finish",
		// 	valueType: "STRING",
		// 	value: finish
		//   }];
		  
		// const metafields1 = await this.update_metafields(metafields);
		// console.log("SET RESPONSE",metafields1);
	}

	handleSave = async () => {
		console.log("Save clicked");
		const {
			id,
			color,
			type,
			length,
			width,
			height,
			top_finish,
			ends_finish,
			finish
		} = this.state;
		const metafields = [{
			namespace: "global",
			key: "Granite Color",
			valueType: "STRING",
			value: color
		  },
		  {
			namespace: "global",
			key: "Product Type",
			valueType: "STRING",
			value: type
		  },
		  {
			namespace: "global",
			key: "Length",
			valueType: "INTEGER",
			value: length
		  },
		  {
			namespace: "global",
			key: "Width",
			valueType: "INTEGER",
			value: width
		  },
		  {
			namespace: "global",
			key: "Height",
			valueType: "INTEGER",
			value: height
		  },
		  {
			namespace: "global",
			key: "Top Finish",
			valueType: "STRING",
			value: top_finish
		  },
		  {
			namespace: "global",
			key: "Ends Finish",
			valueType: "STRING",
			value: ends_finish
		  },
		  {
			namespace: "global",
			key: "Finish",
			valueType: "STRING",
			value: finish
		  }];
		  
		const response = await this.update_metafields(id, metafields);
		console.log("SET RESPONSE",response);
	}
	check_for_metafields = async() => {
		const GET_METAFIELDS = JSON.stringify({
			query:`{
				product(id: "gid://shopify/Product/4459432444039") {
				  metafields(namespace: "global", first: 2) {
					edges {
					  node {
						id
						namespace
						key
						value
					  }
					}
				  }
				}
			  }`
		})
	}
	getItem = async () => {
		const item = store.get("item");
		const image = item.images.edges[0]
			? item.images.edges[0].node.originalSrc
			: "";
		const price = item.variants.edges[0].node.price;
		const title = item.title;
		const id = item.id;
		
		const metafields = await this.get_metafields(title);
		console.log("GET RESPONSE",metafields);

		this.setState({ price, image, title, id });
	};

	create_product = async (metafields) => {
		const UPDATE_METAFIELDS = JSON.stringify({
			query:`mutation($input: ProductInput!) {
				productCreate(input:$input) 
				{
					userErrors {
					  field
					  message
					}
				}
			}`,
			variables:{
				"input":{
					"title":"Carrot",
					"metafields": metafields
				}
			}
		})


		const response = await fetch(`https://cors-anywhere.herokuapp.com/https://granitedevstore2.myshopify.com/admin/api/2019-07/graphql.json`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  "X-Shopify-Access-Token": 'd54c116c44690af467e3aaedcb22ee59',
			},
			body: UPDATE_METAFIELDS
		  });
		const responseJson = await response.json();
		return responseJson;
	}

	update_metafields = async (id, metafields) => {
		const UPDATE_METAFIELDS = JSON.stringify({
			query:`mutation($input: ProductInput!) {
				productUpdate(input:$input) 
				{
					userErrors {
					  field
					  message
					}
				}
			}`,
			variables:{
				"input":{
					"id": id,
					"metafields": metafields
				}
			}
		})


		const response = await fetch(`https://cors-anywhere.herokuapp.com/https://granitedevstore2.myshopify.com/admin/api/2019-07/graphql.json`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  "X-Shopify-Access-Token": 'd54c116c44690af467e3aaedcb22ee59',
			},
			body: UPDATE_METAFIELDS
		  });
		const responseJson = await response.json();
		return responseJson;
	}

	get_metafields = async (title) => {
		const GET_METAFIELDS = JSON.stringify({
			query:`{
				productByHandle(handle: "${title}") {
				  metafields(first: 10) {
					edges {
					  node {
						key
						value
					  }
					}
				  }
				}
			}`
		})

		const response = await fetch(`https://cors-anywhere.herokuapp.com/https://granitedevstore2.myshopify.com/admin/api/2019-07/graphql.json`, {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  "X-Shopify-Access-Token": 'd54c116c44690af467e3aaedcb22ee59',
			},
			body: GET_METAFIELDS
		  });
		const responseJson = await response.json();
		return responseJson.data.productByHandle.metafields.edges;
	}

	render() {
		console.log(this.state);
		const {
			title,
			image,
			color,
			type,
			length,
			width,
			height,
			top_finish,
			ends_finish,
			finish
		} = this.state;
		return (
			<Page
				breadcrumbs={[{ content: "Products", url: "/products" }]}
				title={title}
				thumbnail={<Thumbnail source={image} />}
				primaryAction={{ content: "Save", onAction: this.handleSave }}
			>
				<Layout>
					<Layout.Section>
						<Card>
							<Card.Section title="Granite Color">
								<TextField
									value={color}
									onChange={value => this.handleChange("color", value)}
								/>
							</Card.Section>

							<Card.Section subdued title="Product Type">
								<TextField
									value={type}
									onChange={value => this.handleChange("type", value)}
								/>
							</Card.Section>
							<Card.Section title="Length">
								<TextField
									value={length}
									type="number"
									onChange={value => this.handleChange("length", value)}
								/>
							</Card.Section>

							<Card.Section subdued title="Width">
								<TextField
									value={width}
									type="number"
									onChange={value => this.handleChange("width", value)}
								/>
							</Card.Section>
							<Card.Section title="Height">
								<TextField
									value={height}
									type="number"
									onChange={value => this.handleChange("height", value)}
								/>
							</Card.Section>
							<Card.Section subdued title="Top Finish">
								<TextField
									value={top_finish}
									onChange={value => this.handleChange("top_finish", value)}
								/>
							</Card.Section>
							<Card.Section title="Ends Finish">
								<TextField
									value={ends_finish}
									onChange={value => this.handleChange("ends_finish", value)}
								/>
							</Card.Section>

							<Card.Section subdued title="Finish">
								<TextField
									value={finish}
									onChange={value => this.handleChange("finish", value)}
								/>
							</Card.Section>
						</Card>
					</Layout.Section>
				</Layout>
			</Page>
		);
	}
}

export default EditProduct;
