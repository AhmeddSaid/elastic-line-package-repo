# ElasticLine

**ElasticLine** is a customizable React component that animates a bending line with text, providing a dynamic visual effect on mouse movement. This component is built using React and GSAP (GreenSock Animation Platform), and is designed for use in modern web applications with Vite.

## Features

- **Customizable Appearance:** Easily change line color, text color, font size, and more through props.
- **Dynamic Animation:** The line bends in response to mouse movements, creating an engaging user experience.
- **Responsive Design:** The component adjusts its size based on the container dimensions.
- **SVG Text Path:** Utilizes SVG for smooth text animations along the bending line.

## Installation

To install the ElasticLine component, run:

```bash
npm install elastic-line
```

or

```bash
yarn add elastic-line
```

If you are using **Bun**, you can install it with:

```bash
bun add elastic-line
```

## Usage

To use the `ElasticLine` component in your application, import it and include it in your JSX. Here’s a simple example:

```jsx
import React from 'react';
import ElasticLine from 'elastic-line';

const App = () => {
  return (
    <div>
      <ElasticLine
        width="40%"
        height="200px"
        bendFactor={1}
        bendSpeed={0.2}
        tension={2}
        text="Bending Line Bending Text"
        lineColor="#df0f0f"
        textColor="#5f0fdf"
        textAlign="center"
        fontSize={42}
      />
    </div>
  );
};

export default App;
```

## Props

The `ElasticLine` component accepts the following props:

| Prop           | Type       | Default       | Description                                                  |
|----------------|------------|---------------|--------------------------------------------------------------|
| `bendFactor`   | number     | `1`           | Controls the intensity of the bending effect.                |
| `bendSpeed`    | number     | `0.2`         | Duration of the bending animation (in seconds).              |
| `tension` | number     | `2`           | Duration of the elastic return animation (in seconds).       |
| `proximityZone`| number     | `50`          | Distance from the line within which the bending effect occurs.|
| `text`         | string     | `"Bending Line Bending Text"` | Text to display along the bending line.                   |
| `lineColor`    | string     | `"#292929"`   | Color of the bending line.                                   |
| `textColor`    | string     | `"#0003b9"`   | Color of the text.                                          |
| `textAlign`    | string     | `"center"`    | Alignment of the text: `"left"`, `"center"`, or `"right"`. |
| `fontSize`     | number     | `42`          | Size of the text.                                           |
| `fontWeight`   | number     | `400`         | Weight of the font.                                         |
| `fontFamily`   | string     | `"impact"`    | Font family of the text.                                   |
| `strokeSize`   | number     | `3`           | Width of the line stroke.                                  |
| `height`       | string     | `"200px"`     | Height of the container.                                   |
| `width`        | string     | `"90%"`       | Width of the container.                                    |

## Development

This package uses [Vite](https://vitejs.dev/) for building and serving the application. To run the development server, use:

```bash
npm run dev
```

To build the project for production, run:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Author

This package is maintained by [Ahmed Said](https://ahmedsaidadnan.com).
```

Feel free to adjust any parts if you want to add more details or change the wording!