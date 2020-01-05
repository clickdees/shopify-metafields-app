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
        ValueChange,
        ValueTypeChange,
        KeyChange,
        NameSpaceChange
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
                onChange={value => KeyChange(item.id, value)}
                label="Key"
                disabled={item.enabled === undefined}
              />
            </Layout.Section>
            <Layout.Section oneThird>
              <TextField
                value={item.namespace}
                onChange={value => NameSpaceChange(item.id, value)}
                label="Namespace"
                disabled={item.enabled === undefined}
              />
            </Layout.Section>
            <Layout.Section oneThird>
              <TextField
                value={item.valueType}
                onChange={value => ValueTypeChange(item.id, value)}
                label="Value type"
                disabled={item.enabled === undefined}
              />
            </Layout.Section>
            <Layout.Section>
              <TextField
                value={item.value}
                onChange={value => ValueChange(item.id, value)}
                type={item.valueType === "INTEGER" ? "number" : ""}
              />
            </Layout.Section>
          </Layout>
        </Card.Section>
      );
    }
  }
  
  export default MetafieldCard;
  