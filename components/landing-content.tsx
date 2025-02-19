"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Joel",
    avatar: "J",
    title: "Software Engineer",
    description: "I got an insight into a heros world and its help me understand my life better",
  },
  {
    name: "Antonio",
    avatar: "A",
    title: "Designer",
    description: "I chatted with rocky and now i train more",
  },
  {
    name: "Mark",
    avatar: "M",
    title: "CEO",
    description: "There are some of the the smartest people who lived on this site.",
  },
  {
    name: "Mary",
    avatar: "M",
    title: "CFO",
    description: "Love it! its like they are alive again, some of my favourite heros are on here!",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}