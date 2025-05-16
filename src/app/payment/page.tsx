import { MainLayout } from "@/components/layout/MainLayout";
import PaymentClient from "./PaymentClient";
import { Suspense } from "react";

export default function PaymentPage() {
  return (
    <MainLayout>
      <section className="pt-32 pb-20 md:py-28 bg-[#F9F6EE] min-h-screen">
        <div className="container-custom">
          <Suspense fallback={<div className="text-center text-[#820000]">Loading payment form...</div>}>
            <PaymentClient />
          </Suspense>
        </div>
      </section>
    </MainLayout>
  );
}
