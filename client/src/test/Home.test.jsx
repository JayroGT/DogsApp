import { screen } from 'testing-library/react'

describe("rendering home page", ()=>{
    test("should render home page", ()=>{
        const homeComponent = screen.getByTestId("home-component");
        expect(homeComponent).toBeInTheDocument();
    })
})