import Button from "../components/Button";

const Settings = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Profile Information</h2>
                  <p className="text-muted-foreground">
                    Update your personal details and profile picture
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative w-16 h-16 rounded-full bg-muted"></div>
                <div className="flex-1">
                  <h3 className="font-medium">Profile Photo</h3>
                  <p className="text-muted-foreground mb-2">
                    Add a photo to personalize your account
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                      Upload Photo
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-muted text-foreground">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
