# Development Guidelines for Template TMA

## HTML Tags and Component Usage

### ⚠️ CRITICAL RULE: HTML Tag Restrictions

**AVOID using any HTML tags except `<div>` and `<span>`**

❌ **DO NOT USE:**
- `<button>`, `<input>`, `<form>`, `<section>`, `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`
- `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`
- `<p>`, `<ul>`, `<ol>`, `<li>`
- `<a>`, `<img>`, `<video>`, `<audio>`
- Any other semantic HTML elements

✅ **ALLOWED:**
- `<div>` - For layout containers and structural elements
- `<span>` - For inline text styling and small content wrappers

### ✅ PREFERRED: Use tmaui Components

**Always use components from the `tmaui` library instead of HTML elements:**

```typescript
import {
  // Layout Components
  Page, Section, Cell, Card, List, Placeholder,

  // Navigation Components
  Tabbar, Navigation, BackButton,

  // Interactive Components
  Button, IconButton, Switch, Slider,

  // Input Components
  Input, Textarea, Select,

  // Display Components
  Avatar, Badge, Banner, Spinner,

  // Typography Components
  Title, Subtitle, Text, Caption,

  // Media Components
  Image
} from "tmaui";
```

### Component Usage Examples

#### ❌ WRONG - Using HTML tags:
```tsx
function WrongComponent() {
  return (
    <section>
      <h1>Title</h1>
      <p>Description</p>
      <button onClick={handleClick}>Click me</button>
      <nav>
        <ul>
          <li><a href="/page1">Page 1</a></li>
          <li><a href="/page2">Page 2</a></li>
        </ul>
      </nav>
    </section>
  );
}
```

#### ✅ CORRECT - Using tmaui components:
```tsx
import { Page, Title, Text, Button, List, Cell } from "tmaui";

function CorrectComponent() {
  return (
    <Page>
      <Title>Title</Title>
      <Text>Description</Text>
      <Button onClick={handleClick}>Click me</Button>
      <List>
        <Cell onClick={() => navigate("/page1")}>Page 1</Cell>
        <Cell onClick={() => navigate("/page2")}>Page 2</Cell>
      </List>
    </Page>
  );
}
```

#### ✅ ACCEPTABLE - Using div/span when necessary:
```tsx
import { Button, Text } from "tmaui";

function AcceptableComponent() {
  return (
    <div className="custom-layout">
      <span className="highlight">
        <Text>Highlighted text</Text>
      </span>
      <div className="button-container">
        <Button>Action</Button>
      </div>
    </div>
  );
}
```

## Common tmaui Component Mappings

| HTML Element | tmaui Alternative | Usage |
|--------------|-------------------|-------|
| `<button>` | `<Button>`, `<IconButton>` | Interactive buttons |
| `<h1>`, `<h2>`, etc. | `<Title>`, `<Subtitle>` | Headings |
| `<p>` | `<Text>`, `<Caption>` | Text content |
| `<img>` | `<Image>`, `<Avatar>` | Images and avatars |
| `<input>` | `<Input>` | Text inputs |
| `<textarea>` | `<Textarea>` | Multi-line text |
| `<select>` | `<Select>` | Dropdown selection |
| `<nav>` | `<Tabbar>`, `<Navigation>` | Navigation elements |
| `<section>` | `<Section>`, `<Card>` | Content sections |
| `<ul>`, `<li>` | `<List>`, `<Cell>` | Lists and list items |
| `<main>` | `<Page>` | Main page container |

## Navigation-Specific Guidelines

### Using Tabbar Components
```tsx
import { Tabbar, Navigation } from "tmaui";

// ✅ CORRECT - Direct tmaui components
<Tabbar>
  <Tabbar.Item
    text="Main"
    selected={isActive}
    onClick={handleClick}
  >
    <Navigation>
      <Icon28Music />
    </Navigation>
  </Tabbar.Item>
</Tabbar>

// ❌ WRONG - Wrapping in HTML elements
<Tabbar>
  <button onClick={handleClick}>
    <Tabbar.Item text="Main">
      <Navigation>
        <Icon28Music />
      </Navigation>
    </Tabbar.Item>
  </button>
</Tabbar>
```

### Page Structure
```tsx
import { Page, Section, Card } from "tmaui";

// ✅ CORRECT - tmaui page structure
function MyPage() {
  return (
    <div className="page-content"> {/* Only div allowed for layout */}
      <Page>
        <Section>
          <Card>
            <Text>Page content</Text>
          </Card>
        </Section>
      </Page>
    </div>
  );
}
```

## Why These Restrictions?

1. **Telegram Consistency**: tmaui components follow Telegram's design system
2. **Platform Optimization**: Components are optimized for Telegram Mini Apps
3. **Theme Integration**: Automatic light/dark theme support
4. **Touch Interactions**: Proper mobile touch handling
5. **Performance**: Optimized for mobile Telegram clients

## Development Checklist

Before submitting code, ensure:

- [ ] No HTML tags used except `<div>` and `<span>`
- [ ] All interactive elements use tmaui components
- [ ] Typography uses `<Title>`, `<Text>`, `<Caption>` instead of heading/paragraph tags
- [ ] Lists use `<List>` and `<Cell>` components
- [ ] Buttons use `<Button>` or `<IconButton>` components
- [ ] Navigation uses `<Tabbar>`, `<Navigation>`, or `<BackButton>`
- [ ] Images use `<Image>` or `<Avatar>` components
- [ ] Forms use `<Input>`, `<Textarea>`, `<Select>` components

## Exception Handling

If you absolutely need functionality not provided by tmaui:

1. **First**: Check if a tmaui component can be customized with className/style props
2. **Second**: Use `<div>` or `<span>` with appropriate styling
3. **Last Resort**: Document why HTML tags are necessary and get approval

Remember: The goal is to maintain consistency with Telegram's design system while ensuring optimal performance in the Telegram Mini App environment.
