import type { Meta, StoryObj } from "@storybook/web-components";
import { type TemplateResult, html } from "lit";
import type { CalendarEvent } from "./interfaces";
import "./RichCalendar";

interface RichCalendarProps {
  year?: number;
  month?: number; // 1-12
  events?: CalendarEvent[];
}

const meta: Meta<RichCalendarProps> = {
  title: "Components/RichCalendar",
  component: "rich-calendar",
  tags: ["autodocs"],
  argTypes: {
    year: {
      control: "number",
      description: "Year to display (optional)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: new Date().getFullYear() },
      },
      category: "Date",
    },
    month: {
      control: "number",
      description: "Month to display (1-12) (optional)",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: new Date().getMonth() + 1 },
      },
      category: "Date",
      min: 1,
      max: 12,
      step: 1,
    },
    events: {
      control: "object",
      description: "Array of events (optional)",
      table: {
        type: { summary: "CalendarEvent[]" },
        defaultValue: { summary: "[]" },
      },
      category: "Data",
    },
  },
};

export default meta;
type Story = StoryObj<RichCalendarProps>;

/**
 * Generates an array of event objects for demonstration purposes.
 * @returns {CalendarEvent[]} Array of event objects.
 */
const generateSampleEvents = (): CalendarEvent[] => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const padMonth = String(month).padStart(2, "0");

  return [
    {
      date: `${year}-${padMonth}-05`,
      content: ["Meeting", "Lunch", "Project Deadline"],
    },
    {
      date: `${year}-${padMonth}-10`,
      content: ["Birthday Party", "Night View Tour"],
    },
    {
      date: `${year}-${padMonth}-20`,
      content: ["Dentist", "Shopping", "Dinner", "Movie"],
    },
  ];
};

/**
 * Template for creating stories.
 * @param {RichCalendarProps} args - Story arguments.
 * @returns {TemplateResult} Lit template.
 */
const Template = ({
  year,
  month,
  events,
}: RichCalendarProps): TemplateResult => html`
  <rich-calendar
    .year=${year}
    .month=${month}
    .events=${events}
  ></rich-calendar>
`;

// Default Story
export const Default: Story = {
  render: Template,
  args: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    events: [],
  },
};

// Story with Events
export const WithEvents: Story = {
  render: Template,
  args: {
    ...Default.args,
    events: generateSampleEvents(),
  },
};

// Specific Month Story
export const SpecificMonth: Story = {
  render: Template,
  args: {
    year: 2024,
    month: 12,
    events: [
      {
        date: "2024-12-25",
        content: ["Christmas"],
      },
      {
        date: "2024-12-31",
        content: ["New Year’s Eve Party"],
      },
    ],
  },
};

// Year and Month Selection Story
export const SelectYearAndMonth: Story = {
  render: Template,
  args: {
    year: 2023,
    month: 7,
    events: [
      {
        date: "2023-07-04",
        content: ["Independence Day Celebration"],
      },
      {
        date: "2023-07-20",
        content: ["Vacation Start"],
      },
    ],
  },
};

// No Events Story
export const NoEvents: Story = {
  render: Template,
  args: {
    year: 2023,
    month: 1,
    events: [],
  },
};
