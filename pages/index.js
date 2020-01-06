import { Page, Button } from "@shopify/polaris";
import { Context } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import ResourceListWithProducts from "../components/ResourceList";

class Products extends React.Component {
  static contextType = Context;
  handleCreate = () => {
    const app = this.context;
    const redirect = Redirect.create(app);
    redirect.dispatch(Redirect.Action.APP, "/create-product");
  };
  render() {
    return (
      <Page>
        <ResourceListWithProducts />
        <div className="right-align">
          <Button onClick={this.handleCreate}>Create Product</Button>
        </div>
      </Page>
    );
  }
}

export default Products;
