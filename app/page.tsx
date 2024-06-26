import { authOptions } from "@/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  DocumentTextIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/outline";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session || !session.pea) {
    redirect("/api/auth/signin");
  }

  const formLinks = [
    {
      href: "/form/create/benefit",
      label: "สวัสดิการ",
      icon: CurrencyDollarIcon,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      href: "/form/create/procurement",
      label: "จัดซื้อจัดจ้าง",
      icon: ShoppingCartIcon,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      href: "/form/create/thousand",
      label: "จัดซื้อจัดจ้างเกิน 1 แสน",
      icon: DocumentTextIcon,
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      href: "/form/create/guarantee",
      label: "คืนค่าประกัน",
      icon: ReceiptRefundIcon,
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="flex flex-col mt-11 gap-3 max-w-7xl mx-auto p-6 bg-gradient-to-br from-pink-400 via-purple-400 via-blue-300 to-green-300 rounded-3xl shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        ยินดีต้อนรับ {session.pea.name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formLinks.map((link, index) => (
          <Link key={index} href={link.href}>
            <div
              className={`flex items-center p-6 ${link.color} text-white rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer`}
            >
              <link.icon className="w-12 h-12 mr-4" />
              <div>
                <h2 className="text-xl font-bold">{link.label}</h2>
                <p className="text-sm">คลิกเพื่อเพิ่มเอกสาร</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
