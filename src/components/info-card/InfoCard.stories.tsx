import { storiesOf } from "@storybook/react"
import { InfoCard } from "./InfoCard"

storiesOf("Lens/InfoCard", module).add("Default", () => (
  <section className="w-96">
    {/* InfoCards fill their parent by default. This `section` only exists to make the story look better */}

    <InfoCard.Container
      icon="database"
      title="Maroon Copper Jasmine"
      link={{
        href: "/?path=/story/welcome--page",
        children: "welcome",
      }}
    >
      <InfoCard.Row label="Provider">PlanetScale</InfoCard.Row>
      <InfoCard.Row label="Region">EU_WEST_1</InfoCard.Row>
      <InfoCard.Row label="RAM">4GB</InfoCard.Row>
      <InfoCard.Row label="CPU">2 cores</InfoCard.Row>
      <InfoCard.Row label="Replicas">3</InfoCard.Row>
      <InfoCard.Row label="Storage">20GB</InfoCard.Row>
      <InfoCard.Row label="Analytics">0</InfoCard.Row>
    </InfoCard.Container>
  </section>
))
