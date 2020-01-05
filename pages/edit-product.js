import React from "react";
import {
  Card,
  List,
  Page,
  Thumbnail,
  TextField,
  Layout,
  Button,
  Heading,
  Subheading,
  ButtonGroup,
  Icon,
  AppProvider,
  ContextualSaveBar,
  Frame
} from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";
import { Redirect } from "@shopify/app-bridge/actions";

import gql from "graphql-tag";
import store from "store-js";
import "./style.css";
import MetafieldCard from "../components/MetafieldCard";

class EditProduct extends React.Component {
  state = {
    id: "",
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
    metafields: []
  };
  componentDidMount() {
    console.log("TOKEN", API_KEY);
    this.getItem();
  }
  getItem = async () => {
    const item = store.get("item");
    const image = item.images.edges[0]
      ? item.images.edges[0].node.originalSrc
      : "";
    const price = item.variants.edges[0].node.price;
    const title = item.title;
    const id = item.id;
    console.log("TITLE", title);
    const response = await this.Get_Metafields(title);

    var metafields = [];
    response.forEach(item => {
      metafields.push(item.node);
    });
    console.log("METAFIELDS", metafields);
    this.setState({ price, image, title, id, metafields });
  };

  Check_Metafields = async () => {
    const GET_METAFIELDS = JSON.stringify({
      query: `{
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
    });
  };

  Create_Product = async metafields => {
    const UPDATE_METAFIELDS = JSON.stringify({
      query: `mutation($input: ProductInput!) {
				productCreate(input:$input) 
				{
					userErrors {
					  field
					  message
					}
				}
			}`,
      variables: {
        input: {
          title: "Carrot",
          metafields: metafields
        }
      }
    });
    const response = await this.Fetch_GraphQL(UPDATE_METAFIELDS);
    return response;
  };

  Update_Metafields = async (id, metafields) => {
    const UPDATE_METAFIELDS = JSON.stringify({
      query: `mutation($input: ProductInput!) {
				productUpdate(input:$input) 
				{
					userErrors {
					  field
					  message
					}
				}
			}`,
      variables: {
        input: {
          id: id,
          metafields: metafields
        }
      }
    });
    const response = await this.Fetch_GraphQL(UPDATE_METAFIELDS);
    return response;
  };

  Get_Metafields = async title => {
    const GET_METAFIELDS = JSON.stringify({
      query: `{
				productByHandle(handle: "${title}") {
				  metafields(first: 10) {
					edges {
					  node {
						key
                        value
                        valueType
                        namespace
                        id
					  }
					}
				  }
				}
			}`
    });
    const response = await this.Fetch_GraphQL(GET_METAFIELDS);

    return response.data.productByHandle.metafields.edges;
  };

  Fetch_GraphQL = async fields => {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://granitedevstore2.myshopify.com/admin/api/2019-07/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": ACCESS_TOKEN
        },
        body: fields
      }
    );
    const responseJson = await response.json();
    return responseJson;
  };

  handleChange = (key, value) => {
    var metafields = [...this.state.metafields];
    var index = metafields.findIndex(item => item.key === key);
    metafields[index].value = value;
    this.setState({ metafields });
  };
  handleCreate = async () => {};

  handleSave = async () => {
    console.log("Save clicked");
    const { metafields, id } = this.state;
    var ar_metafields = [];

    metafields.map(item => {
      ar_metafields.push({ id: item.id, value: item.value });
    });
    console.log("AR_METAFIELS", ar_metafields);

    const response = await this.Update_Metafields(id, ar_metafields);
    console.log("SET RESPONSE", response);
  };

  render() {
    console.log(this.state);
    const { title, image, metafields } = this.state;
    const redirectToProduct = () => {
      const redirect = Redirect.create(app);
      redirect.dispatch(Redirect.Action.APP, "/products");
    };

    const card_section = metafields.map((item, index) => {
      return <MetafieldCard item={item} index={index} />;
    });

    return (
      // <Frame>
      //   <ContextualSaveBar
      //     alignContentFlush
      //     message="Unsaved changes"
      //     saveAction={{
      //       onAction: () => console.log("add form submit logic")
      //     }}
      //     discardAction={{
      //       onAction: () => console.log("add clear form logic")
      //     }}
      //   />
      <Page
        breadcrumbs={[{ content: "Products", url: "/products" }]}
        title={title}
        thumbnail={<Thumbnail source={image} />}
        primaryAction={[
          { content: "Cancel", id: "btn_cancel" },
          { content: "Save", id: "btn_save" }
        ]}
      >
        <Layout>
          <Layout.Section>
            <Card>{card_section}</Card>
          </Layout.Section>
        </Layout>
      </Page>
      // </Frame>
    );
  }
}

export default EditProduct;
