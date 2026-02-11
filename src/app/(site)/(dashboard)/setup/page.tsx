import SetupFlow from "@/components/Setup/SetupFlow";

export default function SetupPage() {
  return (
    <section className="pb-20 pt-10 md:pt-12 lg:pt-16 bg-darkmode min-h-screen">
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <SetupFlow />
      </div>
    </section>
  );
}
