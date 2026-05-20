import Header from "@/components/Header";
import FarmDiary from "@/components/FarmDiary";

const Diary = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-header">
        <FarmDiary />
      </main>
    </div>
  );
};

export default Diary;