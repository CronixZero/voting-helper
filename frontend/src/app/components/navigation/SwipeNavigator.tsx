import {
  Button, Divider,
  Modal,
  ModalBody,
  ModalContent, ModalFooter,
  ModalHeader,
  useDisclosure
} from "@nextui-org/react";
import {Candidate} from "@/app/models";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store";
import React, {useState} from "react";
import {
  Sheet, SheetClose,
  SheetContent, SheetDescription, SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/app/components/ui/sheet";
import {useIsMobile} from "@nextui-org/use-is-mobile";
import {Plus} from "lucide-react";
import Swipeable from "@/app/components/Swipeable";

export function SwipeNavigator() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
      <div>
        <Swipeable onSwipeRight={() => setSheetOpen(true)}>
          <div className="fixed w-full h-full"></div>
        </Swipeable>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button className="fixed right-0 bottom-0 m-3 z-[1]"
                    isIconOnly={useIsMobile()}
                    color="success"
                    variant="solid"
                    size={useIsMobile() ? undefined : "lg"}
                    radius={useIsMobile() ? "lg" : "sm"}>
              {useIsMobile() ? "" : "Stimme hinzufügen"}
              <Plus size={30}/>
            </Button>
          </SheetTrigger>
          <Swipeable onSwipeLeft={() => setSheetOpen(false)}>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <div className="flex flex-wrap py-4 gap-2">
                <a href="/candidates" className="basis-full">
                  <h4 className="text-medium font-medium">Kandidaten</h4>
                  <p className="text-small text-default-400">Neue Kandidaten hinzufügen und alle
                    Kandidaten einsehen und bearbeiten </p>
                </a>
                <Divider/>
                <a href="/votes" className="basis-full">
                  <h4 className="text-medium font-medium">Stimmen</h4>
                  <p className="text-small text-default-400">Alle Stimmen einsehen und neue
                    Stimmzettel hinzufügen</p>
                </a>
                <Divider/>
                <a href="/count" className="basis-full">
                  <h4 className="text-medium font-medium">Auszählung</h4>
                  <p className="text-small text-default-400">Das Endergebnis der Wahl einsehen</p>
                </a>
              </div>
            </SheetContent>
          </Swipeable>
        </Sheet>
      </div>
  )
}