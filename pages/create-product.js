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
import { Context } from "@shopify/app-bridge-react";

import gql from "graphql-tag";
import store from "store-js";
import "./style.css";
import MetafieldCard from "../components/MetafieldCard";
import Cookies from "js-cookie";

const ACCESSTOKEN = Cookies.get("ACCESSTOKEN");

class CreateProduct extends React.Component {
  static contextType = Context;
  state = {
    price: "",
    title: "",
    description: "",
    image: "",
    metafields: [
      {
        key: "Product Type",
        valueType: "STRING",
        value: "",
        namespace: "global",
        id: 0
      },
      {
        key: "Length",
        valueType: "INTEGER",
        value: "",
        namespace: "global",
        id: 1
      },
      {
        key: "Width",
        valueType: "INTEGER",
        value: "",
        namespace: "global",
        id: 2
      },
      {
        key: "Height",
        valueType: "INTEGER",
        value: "",
        namespace: "global",
        id: 3
      },
      {
        key: "Top Finish",
        valueType: "STRING",
        value: "",
        namespace: "global",
        id: 4
      },
      {
        key: "Ends Finish",
        valueType: "STRING",
        value: "",
        namespace: "global",
        id: 5
      },
      {
        key: "Finish",
        valueType: "STRING",
        value: "",
        namespace: "global",
        id: 6
      },
      {
        key: "Granite Color",
        valueType: "STRING",
        value: "",
        namespace: "global",
        id: 7
      }
    ],
    newcount: 8
  };

  Fetch_GraphQL = async fields => {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://granitedevstore2.myshopify.com/admin/api/2019-07/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": ACCESSTOKEN
        },
        body: fields
      }
    );
    const responseJson = await response.json();
    return responseJson;
  };
  calcSKU = () => {
    const { metafields } = this.state;
    var sku = "";
    metafields.map(item => {
      if (item.valueType === "INTEGER") {
        var str = item.value.toString();
        if (str.length === 0) sku += "00";
        else if (str.length === 1) sku += "0" + str;
        else sku += str[0] + str[1];
      } else {
        const str = item.value;
        var cnt = 0;
        for (var i = 0; i < str.length; i++) {
          const iChar = str.charAt(i);
          if (
            cnt < 3 &&
            ((iChar >= "A" && iChar <= "Z") || ("0" <= iChar && iChar <= "9"))
          ) {
            sku += iChar;
            cnt++;
          }
        }
      }
    });
    return sku;
  };
  titleChange = title => {
    this.setState({ title });
  };
  descriptionChange = description => {
    this.setState({ description });
  };
  valueChange = (id, value) => {
    var metafields = [...this.state.metafields];
    const index = metafields.findIndex(item => item.id === id);
    metafields[index].value = value;
    this.setState({ metafields });
  };
  valuetypeChange = (id, value) => {
    var metafields = [...this.state.metafields];
    const index = metafields.findIndex(item => item.id === id);
    metafields[index].valueType = value;
    this.setState({ metafields });
  };
  keyChange = (id, value) => {
    var metafields = [...this.state.metafields];
    const index = metafields.findIndex(item => item.id === id);
    metafields[index].key = value;
    this.setState({ metafields });
  };
  namespaceChange = (id, value) => {
    var metafields = [...this.state.metafields];
    const index = metafields.findIndex(item => item.id === id);
    metafields[index].namespace = value;
    this.setState({ metafields });
  };

  handleCreate = async () => {
    var metafields = [...this.state.metafields];
    const newcount = this.state.newcount;
    metafields.push({
      key: "",
      value: "",
      valueType: "",
      namespace: "",
      id: newcount,
      enabled: true
    });
    this.setState({ metafields, newcount: newcount + 1 });
  };

  handleSave = async () => {
    console.log("Save clicked");
    const { metafields, title, description } = this.state;
    var cr_metafields = [];
    const sku = this.calcSKU();
    metafields.map(item => {
      cr_metafields.push({
        key: item.key,
        value: item.value,
        valueType: item.valueType,
        namespace: item.namespace
      });
    });
    console.log("AR_METAFIELS", cr_metafields);
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
          title,
          descriptionHtml: description,
          metafields: cr_metafields,
          variants: { sku }
        }
      }
    });
    const response = await this.Fetch_GraphQL(UPDATE_METAFIELDS);
    console.log(response);
    this.redirectToProduct();
  };
  redirectToProduct = () => {
    const app = this.context;
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.APP, "/index");
  };
  render() {
    const { title, metafields, description } = this.state;
    const card_section = metafields.map((item, index) => {
      return (
        <MetafieldCard
          item={item}
          index={index}
          key={item.id}
          valueChange={this.valueChange}
          valuetypeChange={this.valuetypeChange}
          keyChange={this.keyChange}
          namespaceChange={this.namespaceChange}
        />
      );
    });

    return (
      <Page
        breadcrumbs={[
          { content: "Products", onAction: this.redirectToProduct }
        ]}
        title={title === "" ? "Unnamed Product" : title}
        primaryAction={[
          { content: "Save", id: "btn-save", onAction: this.handleSave },
          {
            content: "Cancel",
            id: "btn-cancel",
            onAction: this.redirectToProduct
          }
        ]}
      >
        <Card>
          <Card.Section>
            <TextField
              value={title}
              onChange={this.titleChange}
              label="Title"
            />
            <div className="description-field">
              <TextField
                value={description}
                onChange={this.descriptionChange}
                label="Description"
                multiline
              />
            </div>
          </Card.Section>
        </Card>
        <Card>{card_section}</Card>

        <div className="right-align">
          <ButtonGroup>
            <Button primary onClick={this.handleSave}>
              Save
            </Button>
            <Button onClick={this.redirectToProduct}>Cancel</Button>
            <Button onClick={this.handleCreate}>Create metafield</Button>
          </ButtonGroup>
        </div>
      </Page>
      // </Frame>
    );
  }
}

export default CreateProduct;
