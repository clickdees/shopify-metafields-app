import { Page } from "@shopify/polaris";
import ResourceListWithProducts from "../components/ResourceList";

class Products extends React.Component {
  state = { open: false };
  render() {
    return (
      <Page>
        <ResourceListWithProducts />
      </Page>
    );
  }
}

export default Products;
