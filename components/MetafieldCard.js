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
  
  class MetafieldCard extends React.Component {
    render() {
      const { index, item } = this.props;
      return (
        <Card.Section subdued={index % 2 != 0} key={item.key}>
          <h1 className="Polaris-Custom">
            {item.key}
            <ButtonGroup>
              <Button plain>
                <Icon source={DeleteMinor} />
              </Button>
            </ButtonGroup>
          </h1>
          <Layout>
            <Layout.Section oneThird>
              <TextField value={item.key} label="Key" disabled={true} />
            </Layout.Section>
            <Layout.Section oneThird>
              <TextField
                value={item.namespace}
                label="Namespace"
                disabled={true}
              />
            </Layout.Section>
            <Layout.Section oneThird>
              <TextField
                value={item.valueType}
                label="Value type"
                disabled={true}
              />
            </Layout.Section>
            <Layout.Section>
              <TextField
                value={item.value}
                onChange={value => this.handleChange(item.key, value)}
                type={item.valueType == "INTEGER" ? "number" : ""}
              />
            </Layout.Section>
          </Layout>
        </Card.Section>
      );
    }
  }
  
  export default MetafieldCard;
  