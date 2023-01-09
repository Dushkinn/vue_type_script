import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import ViewComponent from "@/components/ViewComponent.vue";

describe("ViewComponent", () => {
  const viewText = "Hello from inside of view";
  it("render span correctly", async () => {
    const viewId = "viewId";
    render(ViewComponent, {
      props: { element: "span", id: viewId },
      slots: { default: viewText },
    });
    const view = await screen.findByText(viewText);
    expect(view.id).toBe(viewId);
    expect(view.innerHTML).toBe(viewText);
  });

  it("snap shot matches", () => {
    const wrapper = render(ViewComponent, { props: { element: "div" } });
    expect(wrapper).toMatchSnapshot();
  });
});
