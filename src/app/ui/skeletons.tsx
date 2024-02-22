import { Card, Skeleton } from "@nextui-org/react";

export default function CardSkeleton() {
  return (
    <>
      <Card className="w-[20rem] h-[16rem] mt-10 p-6 flex flex-col justify-between space-y-5 p-4 bg-gray-800 rounded-md" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-16 rounded-lg bg-default-300 bg-slate-600"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg bg-slate-600">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg bg-slate-600">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg bg-slate-600">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>
    </>
  );
}
