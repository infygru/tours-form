"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DialogOpen } from "@/components/shared/dialog-open";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Close } from "@radix-ui/react-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePickerDemo } from "@/components/shared/calender";
import { SelectScrollable } from "@/components/shared/select";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "",
    phone: "",
    email: "",
    address: "",
    package: "",
    date: "",
  });

  const [otp, setOtp] = useState<any>("");
  const [typeOtp, setTypeOtp] = useState<string>("");
  const [errors, setErrors] = useState<any>({});

  const formFields: any = [
    { name: "name", type: "text", placeholder: "Enter your name" },
    { name: "phone", type: "text", placeholder: "Enter your phone number" },
    { name: "email", type: "email", placeholder: "Enter your email" },
    { name: "address", type: "text", placeholder: "Enter your address" },
    {
      name: "package",
      type: "select",
      placeholder: "Enter package details",
      options: [
        { package: "Peace in solitude package", price: "9652", id: 1 },
        { package: "Couple package", price: "8445", id: 2 },
        { package: "Benefactor package", price: "7842", id: 3 },
        { package: "Peace in unity package", price: "6032", id: 4 },
      ],
    },
    { name: "date", type: "date", placeholder: "Select a date" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors: any = {};

    formFields.forEach((field: any) => {
      if (!formData[field.name]) {
        newErrors[field.name] = "This field is required";
        formIsValid = false;
      }
    });
    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    const realOtp = otp?.otp;
    if (!realOtp) {
      setErrors({ general: "OTP is not sent" });
      return;
    }

    if (realOtp !== typeOtp) {
      setErrors({ general: "OTP is invalid" });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Registration failed");

      toast.success("Registration successful");
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        package: "",
        date: "",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleToOtpVerify = async () => {
    const realOtp = otp?.result?.[0]?.otp;
    if (realOtp !== typeOtp) {
      toast.error("OTP is invalid");
      return;
    }
    toast.success("OTP verified successfully");
  };

  const handleToSendEmail = async () => {
    try {
      const response = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      if (!response.ok) throw new Error("OTP request failed");

      const data = await response.json();
      setOtp(data);
      toast.success("OTP sent successfully");
    } catch (error) {
      console.error("OTP request failed:", error);
      setErrors({ general: "OTP request failed. Please try again." });
    }
  };

  return (
    <main className="flex items-center mt-6 justify-center">
      <div className="absolute top-0 left-0 z-10">
        <img
          className="w-[35%] h-auto"
          src="https://tours.naren.info/wp-content/uploads/2024/04/hero-bg.png"
          alt=""
        />
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                strokeWidth="15"
                r="15"
                cx="40"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2s"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.4s"
                />
              </circle>
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                strokeWidth="15"
                r="15"
                cx="100"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2s"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="-.2s"
                />
              </circle>
              <circle
                fill="#FF156D"
                stroke="#FF156D"
                strokeWidth="15"
                r="15"
                cx="160"
                cy="65"
              >
                <animate
                  attributeName="cy"
                  calcMode="spline"
                  dur="2s"
                  values="65;135;65;"
                  keySplines=".5 0 .5 1;.5 0 .5 1"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
            </svg>
          </div>
        </div>
      )}
      <div className="w-full relative z-20 max-w-3xl">
        <div className="bg-white border rounded-3xl">
          <ScrollArea className="min-h-auto w-full">
            <div className="p-8">
              <h1 className="text-2xl text-center font-bold mb-4">
                Register Now
              </h1>
              <form onSubmit={handleSubmit}>
                {formFields.map((field: any) => (
                  <>
                    {field.type === "date" ? (
                      <DatePickerDemo
                        setFormData={setFormData}
                        formData={formData}
                      />
                    ) : field.type === "select" ? (
                      <div className="pb-4">
                        <label
                          htmlFor={field.name}
                          className="block font-semibold text-gray-700 mb-1"
                        >
                          {field.name.charAt(0).toUpperCase() +
                            field.name.slice(1)}
                        </label>
                        <SelectScrollable
                          formData={formData}
                          setFormData={setFormData}
                          optios={field.options}
                        />
                      </div>
                    ) : (
                      <div key={field.name} className="mb-4">
                        <label
                          htmlFor={field.name}
                          className="block font-semibold text-gray-700 mb-1"
                        >
                          {field.name.charAt(0).toUpperCase() +
                            field.name.slice(1)}
                        </label>
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className={`w-full py-2 px-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 ${
                            errors[field.name] && "border-red-500"
                          }`}
                        />
                        {field.name === "email" && formData[field.name] && (
                          <div className="w-max">
                            <DialogOpen
                              button={
                                <div className="flex w-full">
                                  <button
                                    type="button"
                                    onClick={handleToSendEmail}
                                    className="px-6 py-3 w-full rounded-xl border text-sm font-semibold bg-gray-100 mt-2"
                                  >
                                    Send OTP
                                  </button>
                                </div>
                              }
                            >
                              <div>
                                <DialogHeader>
                                  <DialogTitle>
                                    Enter code sent to your email
                                  </DialogTitle>
                                  <DialogDescription>
                                    {formData.email}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="otp" className="text-right">
                                      OTP
                                    </Label>
                                    <Input
                                      onChange={(e) =>
                                        setTypeOtp(e.target.value)
                                      }
                                      placeholder="Enter OTP"
                                      type="text"
                                      id="otp"
                                      className="col-span-3"
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter")
                                          handleToOtpVerify();
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                  <p className="mt-3 text-sm text-gray-500">
                                    Haven’t received the OTP?
                                  </p>
                                  <div onClick={handleToSendEmail}>
                                    <span className="text-base cursor-pointer text-red-500 underline">
                                      Resend
                                    </span>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Close
                                    className="px-6 py-3 rounded-2xl border text-sm font-semibold bg-gray-100 mt-2"
                                    onClick={handleToOtpVerify}
                                  >
                                    Save changes
                                  </Close>
                                </DialogFooter>
                              </div>
                            </DialogOpen>
                          </div>
                        )}
                        {errors[field.name] && (
                          <p className="text-sm text-red-500">
                            {errors[field.name]}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                ))}
                {errors.general && (
                  <p className="text-sm text-red-500 mb-4">{errors.general}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Register Now
                </button>
              </form>
            </div>
          </ScrollArea>
        </div>
      </div>
    </main>
  );
};

export default Signup;
