import type { Meta, StoryObj } from "@storybook/web-components";
import "./MyHeader";

type NavItem = {
  label: string;
  href: string;
};

interface MyHeaderProps {
  logo: string;
  navItems?: NavItem[];
}

const meta: Meta<MyHeaderProps> = {
  title: "Components/MyHeader",
  component: "my-header",
  tags: ["autodocs"],
  argTypes: {
    logo: { control: "text" },
    navItems: { control: "object" },
  },
  args: {
    logo: "LOGO",
    navItems: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export default meta;
type Story = StoryObj<MyHeaderProps>;

export const Default: Story = {
  args: {
    logo: "LOGO",
    navItems: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export const CustomLogo: Story = {
  args: {
    logo: "MySite",
    navItems: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
};

export const AdditionalNavItems: Story = {
  args: {
    logo: "LOGO",
    navItems: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

export const LongLogo: Story = {
  args: {
    logo: "MySuperLongWebsiteName",
    navItems: [
      { label: "Home", href: "/" },
      { label: "Docs", href: "/docs" },
      { label: "Support", href: "/support" },
    ],
  },
};
