# Preconditions

Install Angular>= 16 and Node>= 20

## Development server

First time run `npm install`
then Run `ng serve` for a dev server and navigate to `http://localhost:4200/`.
or
Run `RunApp.bat` batch file. it will install all the packeges and run the application in development mode

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io)
or
Run `TestApp.bat` batch file

## Description

In this application, I've structured it into five distinct modules for improved organization and performance optimization:

1. **App Module:** This serves as the main module, encompassing the central app component and the primary layout component.

2. **Customer Module:** Within this module, you'll find components related to customers, including the customer list, customer view, and the add customer popup.

3. **Vehicle Module:** This module focuses on vehicle-related functionalities. It includes components for the vehicle list, vehicle view, and an add vehicle popup.

4. **Contract Module:** Within this module, you'll encounter components related to contracts. This includes a contract overview component and an add contract component.

Additionally, there's a **SharedModule:** This encompasses shared resources like routes, models, and services that are utilized across various parts of the application.

The motivation behind this modular approach is to implement lazy loading, which significantly enhances the application's performance. Modules are loaded only when they're needed, leading to faster initial loading times and overall smoother user experiences.

To enhance the visual appeal and user-friendliness of the interface, I've utilized following UI frameworks and design tools:

- **Bootstrap 5:** Used for responsive design and styling, ensuring the application looks great on various devices.
- **DevExtreme:** Leveraged for UI components, enhancing the overall aesthetics and functionality.
- **Material Design:** Integrated for a consistent and modern design language throughout the application.

For user notifications, the **ngx-toastr** library is employed, providing a seamless way to display non-intrusive notifications. Additionally, for more prominent alerts, **sweetalert2** is utilized, enhancing the user's understanding of important actions.

By combining these strategies and tools, the application achieves not only enhanced performance but also a visually pleasing and user-friendly interface.
