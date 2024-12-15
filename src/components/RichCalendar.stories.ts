import { html } from 'lit';
import './RichCalendar';

export default {
  title: 'Example/RichCalendar',
  tags: ['autodocs'],
  argTypes: {
    year: { control: 'number', description: 'Year to display (optional)' },
    month: {
      control: 'number',
      description: 'Month to display (1-12) (optional)',
    },
    events: { control: 'object', description: 'Array of events (optional)' },
  },
};

/**
 * Generates an array of event objects with dates in the current month.
 * @returns {Array} Array of event objects.
 */
const generateCurrentMonthEvents = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const padMonth = String(month).padStart(2, '0');

  return [
    {
      date: `${year}-${padMonth}-05`,
      content: ['Meeting', 'Lunch', 'Project Deadline'],
    },
    {
      date: `${year}-${padMonth}-10`,
      content: ['Birthday Party', 'Night View Tour'],
    },
    {
      date: `${year}-${padMonth}-20`,
      content: ['Dentist', 'Shopping', 'Dinner', 'Movie'],
    },
  ];
};

const Template = ({ year, month, events }) => html`
  <rich-calendar .year=${year} .month=${month} .events=${events}>
    <p style="margin-top: 16px; text-align:center; font-size:14px;">Children</p>
  </rich-calendar>
`;

export const Default = Template.bind({});
Default.args = {};

export const WithEvents = Template.bind({});
WithEvents.args = {
  events: generateCurrentMonthEvents(),
};
