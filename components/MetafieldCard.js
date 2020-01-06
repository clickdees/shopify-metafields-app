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
      const {
        index,
        item,
        valueChange,
        valuetypeChange,
        keyChange,
        namespaceChange
      } = this.props;
      return (
        <Card.Section subdued={index % 2 != 0}>
          <h1 className="Polaris-Custom">
            {item.key === "" ? "Unnamed Metafield" : item.key}
            <ButtonGroup>
              <Button plain>
                <Icon source={DeleteMinor} />
              </Button>
            </ButtonGroup>
          </h1>
          <Layout>
            <Layout.Section oneThird>
              <TextField
                value={item.key}
                onChange={value => keyChange(item.id, value)}
                label="Key"
                disabled={item.enabled === undefined}
              />
            </Layout.Section>
            <Layout.Section oneThird>
              <TextField
                value={item.namespace}
                onChange={value => namespaceChange(item.id, value)}
                label="Namespace"
                disabled={item.enabled === undefined}
              />
            </Layout.Section>
            <Layout.Section oneThird>
              <TextField
                value={item.valueType}
                onChange={value => valuetypeChange(item.id, value)}
                label="Value type"
                disabled={item.enabled === undefined}
              />
            </Layout.Section>
            <Layout.Section>
              <TextField
                value={item.value}
                onChange={value => valueChange(item.id, value)}
                type={item.valueType === "INTEGER" ? "number" : ""}
              />
            </Layout.Section>
          </Layout>
        </Card.Section>
      );
    }
  }
  
  export default MetafieldCard;
  