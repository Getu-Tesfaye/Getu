Ethio Telecom Web Interface 
Overview
This project is a static  of the Ethio Telecom web portal built using semantic HTML5, CSS3, and modern layout techniques (CSS Grid and Flexbox). It features a responsive navigation bar, a hero banner section, package menu cards, and a footer section.

      Technical Stack & Tools
Markup Language: HTML5 (Semantic elements)

Styling: CSS3 (Flexbox, CSS Grid, Media Queries, CSS Transitions)

Design/Development Tools: VS Code, Live Server Extension, Google Chrome Developer Tools

Assets: Images/banners representing Ethio Telecom services (Glo Café, Voice Packages, telebirr)

         Structural Breakdown
1. Navigation Bar (<nav>)
Purpose: Houses the main brand identity and top-level navigation links.

Layout: Built using Flexbox (display: flex) with justify-content: space-between to separate the logo (Ethio Telecom) from the navigation links (Home, Consumer, Business, telebirr, About Us).

Styling Details: Clean white background, bold branding text in Ethio Telecom's green theme (#8dc63f), and subtle hover states for navigation links.

2. Hero Section (<section class="hero">)
Purpose: Highlights primary promotional banners and featured offers.

Layout: Organizes promotional banners using CSS Flexbox or Grid.

Components: Display banners such as the  / Tuesday Offer" image paired with key call-to-action text (Buy Mobile Data).

3. Menu Section (<section class="menu"> / <main>)
Purpose: Displays service cards (e.g., Voice Packages, Internet Data Bundles, telebirr services).

Layout: Built using CSS Grid (display: grid) to create a responsive multi-column layout for service cards.

Interactive Features: Cards feature active click effects (:active with transform: scale() or shake animations) to provide feedback when selected.

4. Footer Section (<footer>)
Purpose: Contains quick links, copyright statements, contact information, and social media links.

Layout: Multi-column grid/flex layout anchored at the bottom of the webpage with standard dark/neutral background contrast.

Key CSS & Layout Commands Used
Below are the key CSS properties applied across the structure from Navbar to Footer:

Structural & Display Properties
display: flex;

Where Used: Navbar, button groups, aligned text containers.

Purpose: Aligns items in a single row or column with flexible spacing.

justify-content: space-between;

Where Used: Navbar header.

Purpose: Pushes the Ethio Telecom logo to the far left and the navigation menu links to the far right.

align-items: center;

Where Used: Navbar, hero container elements.

Purpose: Vertically centers child elements inside their parent container.

display: grid; & grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

Where Used: Package menu section.

Purpose: Automatically creates a responsive grid layout for service cards that adapts to desktop and mobile screens without manual media queries.

Visual Effects & Animations
transform: scale(0.98);

Where Used: Card interactions (.card:active).

Purpose: Shrinks elements slightly on click to simulate a physical pressing effect.

transition: all 0.3s ease;

Where Used: Navigation links, service cards, CTA buttons.

Purpose: Smooths color changes and scaling animations on hover/click.

border-radius: 12px;

Where Used: Hero banners and service cards.

Purpose: Curves card corners to match modern mobile/web UI standards.