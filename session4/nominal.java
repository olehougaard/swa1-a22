interface Sizable {
    int size();
}

interface Sized {
    int size();
}

class C {
    public static int getSize(Sizable s) {
        return s.size();
    }
}

class D {
    public static void main(String[] args) {
        Sized s = new ...;
        C.getSize(s); // ERROR: expects Sizable, not Sized.
    }
}
