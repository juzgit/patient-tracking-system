import React from "react";
import { render } from "@testing-library/react";
import DoctorSidebar from "../components/DoctorSidebar";
import DoctorSidebarWrapper from "../DoctorSidebarwrapper";

test('DoctorSidebar matches snapshot', () => {
    const { container } = render(
        <DoctorSidebarWrapper>
            <DoctorSidebar />
        </DoctorSidebarWrapper>
    );
    expect(container).toMatchSnapShot();
});