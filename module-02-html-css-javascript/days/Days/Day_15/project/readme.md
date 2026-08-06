1. <index.html (Landing Page)>
Role: Serves as the primary entry point to welcome visitors.

Key Components:

<Header/Navbar>: Brand logo (Habesha Eatery), primary navigation links, and a call-to-action (CTA) button ("Reserve").

<Hero Section>: Headline ("Welcome to Habesha Eatery"), tagline, and action buttons ("Explore Menu", "Book a Table").

2. <menu.html (Menu Showcase Page)>
Role: Displays dishes and pricing in a clean grid.

Key Components:

Filter categories (e.g., Traditional, Drinks, Desserts).

Food cards containing an image (<img src="images/...">), title (<h3>), description (<p>), price tag, and an "Order" or "Add" button.

3. <about.html (Story & Culture Page)>
Role: Highlights the restaurant's origin, authentic Ethiopian heritage, and team values.

Key Components:

Informational text blocks with styled headings.

Side-by-side content grids featuring culture highlights and kitchen imagery.

4. <reservation.html (Table Booking Page)>
Role: Allows customers to book a table online.

Key Components:

Form Elements: Inputs for Full Name, Phone Number, Date (<input type="date">), Time (<input type="time">), and Guest Count (<select>).

Styled submit button matching the primary theme.

5. <contact.html (Contact & Location Page)>
Role: Provides direct communication channels and physical location details.

Key Components:

Inquiry form (Name, Email, Message box).

Direct contact details (Phone, Address, Hours) accompanied by FontAwesome icons.

6. <Global Footer (<footer>)>
Role: Consistently displayed across all HTML pages at the bottom.

Key Components:

Quick links to main pages (index.html, menu.html, etc.).

Social media icons (fa-facebook, fa-instagram, fa-twitter).

Copyright statement (© 2026 Habesha Eatery).

3. <CSS Architecture (style.css)>
The stylesheet turns static HTML skeletons into a polished, responsive user interface:

<Global Reset & Variables>: Sets box-sizing, custom color codes (emerald greens, warm ambers, dark neutrals), and clean font families.

<Navigation Bar Styling>: Modern flexbox navigation header with hover effects and rounded CTA buttons.

Card Component System (.card):

Class modifier pattern (.card-emerald, .card-amber) for individual color accents.

<object-fit>: cover on .card-img so food imagery scales cleanly.

Badge positioning and typography hierarchy.

<Responsive Layouts>: Uses CSS Flexbox and CSS Grid to ensure the layout adapts smoothly across desktop, tablet, and mobile devices.

