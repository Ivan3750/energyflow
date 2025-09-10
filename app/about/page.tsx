import { Dumbbell, Users, Clock, User } from "lucide-react";

export default function Home() {
  const advantages = [
    { 
      icon: "🏋️", 
      title: "Сучасний інвентар",
      description: "Новітнє обладнання від провідних світових брендів для ефективних тренувань"
    },
    { 
      icon: "👨‍🏫", 
      title: "Професійні тренери",
      description: "Сертифіковані фахівці з багаторічним досвідом роботи та індивідуальним підходом"
    },
    { 
      icon: "⏰", 
      title: "Гнучкий графік",
      description: "Працюємо з 6:00 до 23:00 без вихідних, щоб ви могли тренуватися у зручний час"
    },
    { 
      icon: "🙋‍♂️", 
      title: "Індивідуальні тренування",
      description: "Персональні програми, розроблені спеціально під ваші цілі та можливості"
    },
  ];

const users = [
  { 
    name: "Alice", 
    icon: "A", 
    comment: "The best gym in town! Professional trainers, modern equipment, and a welcoming atmosphere. I feel motivated every time I come here, and the personal training sessions really help me achieve my fitness goals. Highly recommend!" 
  },
  { 
    name: "Bob", 
    icon: "B", 
    comment: "I've been coming here for over a year and the results are incredible. The trainers always provide guidance, the classes are engaging, and the gym is always clean and organized. I feel healthier and more energetic than ever before!" 
  },
  { 
    name: "Clara", 
    icon: "C", 
    comment: "Clean, organized, and top-notch equipment. The staff is friendly and always ready to help. I especially love the group classes—they keep me motivated and push me to do my best every time. This gym is worth every penny!" 
  },
  { 
    name: "David", 
    icon: "D", 
    comment: "Flexible working hours allow me to train even after a long workday. The trainers are attentive and offer helpful tips for improving my technique. I enjoy every session and always leave feeling accomplished and energized!" 
  },
  { 
    name: "Eva", 
    icon: "E", 
    comment: "Trainers truly care about each member's progress. I've lost 10 kg in 3 months thanks to their personalized programs. The community here is supportive, and the atmosphere keeps me coming back. I feel stronger, healthier, and more confident!" 
  },
  { 
    name: "Frank", 
    icon: "F", 
    comment: "The gym has a motivating atmosphere that pushes me to achieve my goals. Every visit is fun and challenging, and I love the variety of equipment and classes available. I always leave feeling full of energy and ready to take on the day!" 
  }
];


  return (
    <main className="p-8 space-y-16">
      {/* Наші переваги */}
      <section>
        <h2>Наші переваги</h2>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            {advantages.map((adv, i) => (
              <div key={i} className="advantage-card">
                <div className="card-icon">{adv.icon}</div>
                <div>
                  <h3>{adv.title}</h3>
                  <p className="text-sm">{adv.description}</p>
                </div>
              </div>
            ))}
          </div>
          <img 
            src="/img/treadmill.jpg" 
            alt="Тренування" 
            className="rounded-xl shadow" 
          />
        </div>
      </section>

      {/* Індивідуальні тренування */}
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="training-card">
          <h3>Індивідуальні тренування</h3>
          <p>
            Персональні заняття з досвідченими тренерами, які розроблять 
            програму спеціально для вас. Індивідуальний підхід, контроль 
            техніки виконання вправ та мотивація для досягнення найкращих результатів.
          </p>
        </div>
        <div className="grid gap-4">
          <img 
            src="/img/gym1.jpg" 
            alt="Зал" 
            className="rounded-xl shadow" 
          />
          <img 
            src="/img/gym2.jpg" 
            alt="Тренажери" 
            className="rounded-xl shadow" 
          />
        </div>
      </section>

      {/* Рандомні коментарі */}
      <section>
        <h2>Відгуки наших клієнтів</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {users.map((user, i) => (
            <div key={i} className="comment-card">
              <div className="flex items-center gap-2 font-semibold">
                <span className="card-icon">{user.icon}</span>
                {user.name}
              </div>
              <p className="text-sm mt-2">{user.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}