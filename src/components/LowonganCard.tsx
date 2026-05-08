import { Building2, Clock4, MapPin } from "lucide-react";
import { Card } from "./Card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const LowonganCard = () => {
  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="aspect-square size-12 bg-blue-300 rounded-md flex items-center justify-center">
          <Building2 className="text-blue-60" />
        </div>
        <Badge variant={"outline"}>Full-time</Badge>
      </div>
      <div className="text-black">
        <p className="font-medium">Frontend Developer Intern</p>
        <p>PT Teknologi Maju</p>
        <p className="text-sm mt-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
          pariatur?
        </p>
        <div className="text-sm flex gap-2 mt-2">
          <MapPin size={18} />
          <p>Jakarta</p>
        </div>
        <div className="text-sm flex gap-2 mt-2">
          <Clock4 size={18} />
          <p>Deadline: 30 Maret 2025</p>
        </div>
        <div className="flex gap-2 mt-5">
          <Button className={"flex-4"}>Daftar</Button>
          <Button className="flex-1" variant="outline">
            <Link to={"/mahasiswa/lowongan/1"}>Detail</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};
