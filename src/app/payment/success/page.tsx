import { MainLayout } from "@/components/layout/MainLayout";
import PaymentSuccessClient from "./PaymentSuccessClient";
import { Suspense } from "react";


export default function SuccessPage() {
  return (
    <MainLayout>
      <section className="py-20 md:py-28 bg-[#F9F6EE]">
        <div className="container-custom">
          <Suspense fallback={<div className="text-center text-[#820000]">Loading...</div>}>
            <PaymentSuccessClient />
          </Suspense>
        </div>
      </section>
    </MainLayout>
  );
}
