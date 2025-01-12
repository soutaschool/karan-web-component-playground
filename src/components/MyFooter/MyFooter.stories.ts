import type { Meta, StoryObj } from "@storybook/web-components";
import "./MyFooter";

interface MyFooterProps {
  logo?: string;
  navItems?: { label: string; href: string }[];
}

const meta: Meta<MyFooterProps> = {
  title: "Components/MyFooter",
  component: "my-footer",
  tags: ["autodocs"],
  argTypes: {
    logo: { control: "text" },
    navItems: { control: "object" },
  },
  args: {
    logo: "",
    navItems: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export default meta;
type Story = StoryObj<MyFooterProps>;

export const Default: Story = {
  args: {
    logo: "",
    navItems: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export const WithLogo: Story = {
  args: {
    logo: "Lit Footer",
    navItems: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export const ManyLinks: Story = {
  args: {
    logo: "MySite",
    navItems: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
    ],
  },
};
