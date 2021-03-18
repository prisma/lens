import { storiesOf } from "@storybook/react";
import { Card } from "./Card";

storiesOf("Lens/Card", module)
  .add("Default", () => <Card />)
  .add("With Title", () => <Card title="Aqua Iron Pomeranian" />)
  .add("With Icon & Title", () => (
    <Card icon="" title="Aqua Iron Pomeranian" />
  ));
