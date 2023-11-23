import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'

function Header() {
    return (
      <header style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
        <h1>Catalyst</h1>
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton />
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignInButton />
        </SignedOut>
      </header>
    );
  }

export default Header;