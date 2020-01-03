import React from "react";
import {
  Card,
  List,
  Page,
  Thumbnail,
  TextField,
  Layout
} from "@shopify/polaris";
import store from "store-js";

class EditProduct extends React.Component {
  state = {
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
    finish: ""
  };
  componentDidMount() {
    this.setItem();
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

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
        primaryAction={{ content: "Save" }}
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
              ​
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
              ​
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
              ​
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
  setItem = () => {
    const item = store.get("item");
    const image = item.images.edges[0]
      ? item.images.edges[0].node.originalSrc
      : "";
    const price = item.variants.edges[0].node.price;
    const title = item.title;
    this.setState({ price, image, title });
  };
}

export default EditProduct;
