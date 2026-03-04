"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Switch } from "@workspace/ui/components/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog";
import {
  Upload,
  LogOut,
  Copy,
  Download,
  AlertTriangle,
  Check,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function SettingsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "SolanaDev_2024",
    bio: "Full-stack developer building on Solana",
    email: "developer@example.com",
  });
  const [theme, setTheme] = useState("auto");
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="pb-5">
        <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
          {t("settings.title")}
        </h1>
        <p className="text-muted-foreground text-base">
          {t("settings.subtitle")}
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6 grid"
      >
        <TabsList className="p-1 bg-secondary/60 rounded-lg h-auto flex-wrap w-full justify-start">
          <TabsTrigger
            value="profile"
            className="rounded-md data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {t("settings.profile.title")}
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="rounded-md data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {t("settings.account.title")}
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="rounded-md data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {t("settings.preferences.title")}
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="rounded-md data-[state=active]:bg-secondary data-[state=active]:text-white data-[state=active]:shadow-sm"
          >
            {t("settings.privacy.title")}
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-secondary/10 bg-secondary/5 hover:border-secondary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                {t("settings.profile.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">
                  {t("settings.profile.avatar")}
                </Label>
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Avatar"
                    />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 h-9 border-secondary/20 hover:bg-secondary/10"
                      >
                        <Upload className="w-4 h-4" />
                        {t("settings.profile.avatarUpload")}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {t("settings.profile.avatarHelp")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-3">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  {t("settings.profile.name")}
                </Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  placeholder={t("settings.profile.namePlaceholder")}
                  className="bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Bio */}
              <div className="space-y-3">
                <Label
                  htmlFor="bio"
                  className="text-sm font-medium text-foreground"
                >
                  {t("settings.profile.bio")}
                </Label>
                <textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  placeholder={t("settings.profile.bioPlaceholder")}
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/50 border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-white h-9">
                  <Check className="w-4 h-4" />
                  {t("common.save")}
                </Button>
                <Button
                  variant="outline"
                  className="h-9 border-secondary/20 hover:bg-secondary/10"
                >
                  {t("common.cancel")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card className="border-secondary/10 bg-secondary/5 hover:border-secondary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                {t("settings.account.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email */}
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  {t("settings.account.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  placeholder={t("settings.account.emailPlaceholder")}
                  className="bg-secondary/10 border-secondary/20 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {/* Connected Wallets */}
              <div className="space-y-4">
                <Label className="text-sm font-medium text-foreground block">
                  {t("settings.account.connectedWallets")}
                </Label>
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    {t("settings.account.noWalletsConnected")}
                  </p>
                  <Button
                    size="sm"
                    className="mt-3 gap-2 bg-secondary hover:bg-secondary/90 text-white h-8"
                  >
                    {t("settings.account.connectWallet")}
                  </Button>
                </div>
              </div>

              {/* OAuth Connections */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground block">
                  {t("nav.connectWallet")} OAuth
                </Label>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-center border-secondary/20 hover:bg-secondary/10 text-foreground"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.545,10.852v3.608h5.338c-0.676,2.01-2.606,3.355-5.338,3.355c-3.21,0-5.819-2.609-5.819-5.819s2.609-5.819,5.819-5.819c1.457,0,2.804,0.541,3.831,1.424l2.846-2.846C15.422,2.823,13.995,2,12.196,2C6.748,2,2.381,6.367,2.381,11.816s4.367,9.816,9.815,9.816c5.805,0,9.615-4.049,9.615-9.815c0-0.666-0.066-1.309-0.195-1.927H12.545z" />
                    </svg>
                    {t("settings.account.googleConnect")}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-center border-secondary/20 hover:bg-secondary/10 text-foreground"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    {t("settings.account.githubConnect")}
                  </Button>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-white h-9">
                  <Check className="w-4 h-4" />
                  {t("common.save")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-secondary/10 bg-secondary/5 hover:border-secondary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                {t("settings.preferences.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language */}
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-foreground block mb-1">
                    {t("settings.preferences.language")}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Choose your preferred language
                  </p>
                </div>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-40 bg-secondary/10 border-secondary/20 text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Theme */}
              <div className="border-t border-secondary/10 pt-6 flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-foreground block mb-1">
                    {t("settings.preferences.theme")}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Choose your color scheme
                  </p>
                </div>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-40 bg-secondary/10 border-secondary/20 text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      {t("settings.preferences.themeLight")}
                    </SelectItem>
                    <SelectItem value="dark">
                      {t("settings.preferences.themeDark")}
                    </SelectItem>
                    <SelectItem value="auto">
                      {t("settings.preferences.themeAuto")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Email Notifications */}
              <div className="border-t border-secondary/10 pt-6 flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-foreground block mb-1">
                    {t("settings.preferences.emailNotifications")}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Receive course and achievement updates via email
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, email: checked })
                  }
                />
              </div>

              {/* Push Notifications */}
              <div className="border-t border-secondary/10 pt-6 flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-foreground block mb-1">
                    {t("settings.preferences.pushNotifications")}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Receive push notifications for important updates
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, push: checked })
                  }
                />
              </div>

              <div className="flex gap-3 pt-6 border-t border-secondary/10">
                <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-white h-9">
                  <Check className="w-4 h-4" />
                  {t("common.save")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="border-secondary/10 bg-secondary/5 hover:border-secondary/20 transition-colors">
            <CardHeader>
              <CardTitle className="text-lg font-heading font-bold text-foreground">
                {t("settings.privacy.title")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Visibility */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground block">
                  {t("settings.privacy.profileVisibility")}
                </Label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20 cursor-pointer hover:bg-secondary/15 transition-colors">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={profileVisibility === "public"}
                      onChange={(e) => setProfileVisibility(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {t("settings.privacy.profilePublic")}
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20 cursor-pointer hover:bg-secondary/15 transition-colors">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={profileVisibility === "private"}
                      onChange={(e) => setProfileVisibility(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {t("settings.privacy.profilePrivate")}
                    </span>
                  </label>
                </div>
              </div>

              {/* Data Export */}
              <div className="border-t border-secondary/10 pt-6 space-y-3">
                <div>
                  <Label className="text-sm font-medium text-foreground block mb-1">
                    {t("settings.privacy.dataExport")}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {t("settings.privacy.exportDescription")}
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="gap-2 border-secondary/20 hover:bg-secondary/10 text-foreground h-9"
                >
                  <Download className="w-4 h-4" />
                  {t("settings.privacy.exportData")}
                </Button>
              </div>

              {/* Delete Account */}
              <div className="border-t border-secondary/10 pt-6 space-y-3">
                <div>
                  <Label className="text-sm font-medium text-red-600 dark:text-red-400 block mb-1">
                    {t("settings.privacy.deleteAccount")}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {t("settings.privacy.deleteDescription")}
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="gap-2 h-9">
                      <AlertTriangle className="w-4 h-4" />
                      {t("settings.privacy.deleteAccount")}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="border-secondary/10 bg-background">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-foreground">
                        {t("settings.privacy.deleteAccount")}
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-muted-foreground">
                        {t("settings.privacy.deleteWarning")}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogCancel
                      className="border-secondary/20 hover:bg-secondary/10"
                      size={undefined}
                      variant={undefined}
                    >
                      {t("common.cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700 text-white"
                      variant={undefined}
                      size={undefined}
                    >
                      {t("settings.privacy.deleteAccount")}
                    </AlertDialogAction>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="flex gap-3 pt-6 border-t border-secondary/10">
                <Button className="gap-2 bg-secondary hover:bg-secondary/90 text-white h-9">
                  <Check className="w-4 h-4" />
                  {t("common.save")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
